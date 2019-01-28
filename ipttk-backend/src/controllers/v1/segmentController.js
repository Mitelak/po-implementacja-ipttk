import { SegmentModel, PointModel } from "../../models";
import mongoose from "mongoose";

export default {
	create: async (req, res) => {
        if(!req.body.startPoint)
            return res.status(400).send({message: "Punkt startowy jest wymagany."})
        if(!req.body.endPoint)
            return res.status(400).send({message: "Punkt końcowy jest wymagany"})
        if(!req.body.gotPoints)
            return res.status(400).send({message: "Liczba punktów GOT jest wymagana."})
        if(!req.body.startDate)
            return res.status(400).send({message: "Data startowa jest wymagana."})
        if(!req.body.mountainGroup)
            return res.status(400).send({message: "Grupa górska jest wymagana."})

        const segment = {
            startPoint: req.body.startPoint,
            endPoint: req.body.endPoint,
            gotPoints: req.body.gotPoints,
            startDate: req.body.startDate,
            mountainGroup: req.body.mountainGroup
        }
        //TODO: brak walidacji czy punkty istnieja
        await SegmentModel.create(segment, (err, segment) => {
            if (err || !segment)
                res.status(500).send({ message: "Wystąpił problem z tworzeniem odcinka szlaku.", err });
            else 
                res.status(201).send(segment);
        })
	},
	get: async (req, res) => {
        await SegmentModel.aggregate([
			{
				$match: {
                    startPoint: req.query.startPoint,
                    startDate: {$lte: req.query.date ? new Date(req.query.date) : new Date()},
                    $or: [
                        {endDate: null},
                        {endDate: {$gte: req.query.date ? new Date(req.query.date) : new Date()}}
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
        .then(result => {
            if(!result || result.length < 1)
                res.status(404).send({message: "Nie zlaleziono odcinka szlaku."})
            else 
                res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ message: "Błąd wewnętrzny. Kod błędu: 500", err })
        })	
    },
    getById: async(req, res) => {
        await SegmentModel.aggregate([
			{
				$match: {
                    shortId: req.params.id,
                    startDate: {$lte: req.query.date ? new Date(req.query.date) : new Date()},
                    $or: [
                        {endDate: null},
                        {endDate: {$gte: req.query.date ? new Date(req.query.date) : new Date()}}
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
        .then(result => {
            if(!result || result.length < 1)
                res.status(404).send({message: "Nie znaleziono odcinka szlaku."})
            else 
                res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ message: "Błąd wewnętrzny. Kod błędu: 500", err })
        })	
    }
}