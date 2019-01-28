import { PointModel } from "../../models";
import mongoose from "mongoose";

export default {
	create: async (req, res) => {
        if(!req.body.name)
            return res.status(400).send({message: "Nazwa jest wymagana."})
        if(!req.body.coordinates)
            return res.status(400).send({message: "Koordynaty GPS są wymagane."})
        if(req.body.coordinates.search(/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/g) === -1)
            return res.status(422).send({message: "Niepoprawny format koordynatów."})
        if(!req.body.description)
            return res.status(400).send({message: "Opis jest wymagany"})
        if(!req.body.startDate)
            return res.status(400).send({message: "Data początkowa jest wymagana"})

        const point = {
            name: req.body.name,
            coordinates: req.body.coordinates,
            description: req.body.description,
            startDate: req.body.startDate
        }

        await PointModel.create(point, (err, point) => {
            if (err || !point)
                res.status(500).send({ message: "Wystąpił problem z tworzeniem punktu", err });
            else 
                res.status(201).send(point);
        })
	},
	getAll: async (req, res) => {
        const query = {
            name: new RegExp(req.query.name, "i"),
            startDate: {$lte: req.query.date ? new Date(req.query.date) : new Date()},  
            $or: [
                {endDate: null},
                {endDate: {$gte: req.query.date ? new Date(req.query.date) : new Date()}}
            ]
        }

        await PointModel.find(query)
        .then(result => {
            if(!result || result.length < 1)
                res.status(404).send({message: "Nie znaleziono punktu"})
            else 
                res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ message: "Błąd wewnętrzny. Kod błędu: 500", err })
        })	
	},
	get: async (req, res) => {
    	const query = {
            shortId: req.params.id, 
            $or: [
                {endDate: null},
                {endDate: {$gte: req.query.date ? new Date(req.query.date) : new Date()}}
            ]
        }

        await PointModel.findOne(query)
        .then(result => {
            if(!result)
                res.status(404).send({message: "Nie znaleziono punktu"})
            else 
                res.status(200).send(result)
        })
        .catch(err => {
            res.status(500).send({ message: "Błąd wewnętrzny. Kod błędu: 500", err })
        })	
	}
}