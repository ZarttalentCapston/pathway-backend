import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Contact from "../models/Contact";
import { sendContactEmail } from "../utils/email";


export const submitContactForm = async (req : Request, res : Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({ errors : errors.array()})
        return
    }

    const { name, email, message } = req.body

    try {
        const contact = await Contact.create({
            name,
            email,
            message
        })

        res.status(200).json({ Message : "Message recieved!"})
        await contact.save()
        await sendContactEmail(name, email, message)
    } catch (error) {
         res.status(500).json({ error: "Server error" });
         console.error(error)
    }

}