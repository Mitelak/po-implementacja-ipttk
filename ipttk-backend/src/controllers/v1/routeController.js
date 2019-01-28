import { RouteModel, UserModel, SegmentModel } from "../../models";
import mongoose from "mongoose";

const getSegments = async (id, activeDate) => {
    return await SegmentModel.aggregate([
        {
            $match: {
                shortId: id,
                startDate: {$lte: activeDate ? new Date(activeDate) : new Date()},
                $or: [
                    {endDate: null},
                    {endDate: {$gte: activeDate ? new Date(activeDate) : new Date()}}
                ]
            },
        },
        {
            $lookup: {
                foreignField: 'shortId',
                localField: 'startPoint',
                from: 'points',
                as: 'startPoint'
            }

        },
        {
            $lookup: {
                foreignField: 'shortId',
                localField: 'endPoint',
                from: 'points',
                as: 'endPoint'
            }

        }
    ])	
}

export default {
	create: async (req, res) => {
        const route = {
            segments: req.body.segments,
            date: req.body.date,
            name: req.body.name,
            createdBy: req.user.email
        }

        await SegmentModel.findOne({shortId: route.segments[0].shortId})
        .then(async segment => {
            route.mountainGroup = segment.mountainGroup

            await RouteModel.create(route)
            .then(result => {
                res.status(201).send(result)
            })
            .catch(err => {
                res.status(500).send({message: "Internal error 2", err})
            })
        })
        .catch(err => {
            res.status(500).send({message: "Internal error 1"})
        })
	},
	get: async (req, res) => {
        await RouteModel.find({
            createdBy: req.user.email,
            shortId: req.params.id
        })
        .then(result => {
            if(!result || result.length < 1)
                res.status(404).send({message: "Nie znaleziono trasy."})
            else if(result[0].createdBy !== req.user.email) {
                res.status(403).send({message: "Nieautoryzowany dostęp do zasobu."})
            } else
                res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ message: "Błąd wewnętrzny. Kod błędu: 500", err })
        })	
	},
	getAll: async (req, res) => {
    	await RouteModel.find({
            createdBy: req.user.email
        })
        .then(result => {
            if(!result || result.length < 1)
                res.status(404).send({message: "Nie znaleziono trasy."})
            else 
                res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ message: "Błąd wewnętrzny. Kod błędu: 500", err })
        })		
    },
    verify: {
        getAll: async (req, res) => {
            RouteModel.find({verified: false, mountainGroup: {$in: req.user.mountainGroup}})
            .then(async routes => {
                //TODO: obsluga 403, 404
                const result = routes.map((route, index) => {  
                    const segments = route.segments.map(async segment => {
                        return { ...(await getSegments(segment.shortId))[0], time: segment.time }
                    })
    
                    return Promise.all(segments)
                    .then(segments => {
                        return {...route._doc, segments}
                    })            
                })
                
                Promise.all(result)
                .then(result => res.status(200).send(result))
                .catch(err => res.status(500).send({message: "Błąd wewnętrzny. Kod błędu: 500", err}))
            })
            .catch(err => {
                res.status(500).send({message: "Błąd wewnętrzny. Kod błędu: 500", err})
            })
        },
        get: async (req, res) => {
            //TODO: obsluga 403, 404
            RouteModel.findOne({verified: false, mountainGroup: {$in: req.user.mountainGroup}, shortId: req.params.id})
            .then(route => {
                const segments = route.segments.map(async segment => {
                    return { ...(await getSegments(segment.shortId))[0], time: segment.time }
                })

                Promise.all(segments)
                .then(segments => {
                    return res.status(200).send({...route._doc, segments})
                })
            })
            .catch(err => {
                res.status(500).send({message: "Błąd wewnętrzny. Kod błędu: 500", err})
            })
        },
        accept: async(req, res) => {
            RouteModel.findOneAndUpdate({verified: false, mountainGroup: {$in: req.user.mountainGroup}, shortId: req.body.shortId}, 
                {verified: true, accepted: req.body.accepted, comments: req.body.comment})
            .then(result => {
                //TODO: obsluga 403, 404
                res.status(200).send(result)
            })
            .catch(err => {
                res.status(500).send({message: "Błąd wewnętrzny. Kod błędu: 500", err})
            })
        }
    }
}