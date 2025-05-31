const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

exports.filter = async (req, res, next) => {
    try {
        const searchQuery = req.body.query;
        console.log(`middleware running with search: ${searchQuery}`)
    
        const completion = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "system",
                    content: "You are a search checker and filter. You only need to check if the search query provided is a valid search if it is related to ethics. Any other search that is unrelated to ethics is an invalid search. Always return a json with property `isValid` and have a boolean value."
                },
                {
                    role: "user",
                    content: searchQuery
                }
            ]
        })

        const result = completion.choices[0].message.content
        const { isValid } = JSON.parse(result)

        if(isValid) return next()

        return res.json({ result: { invalidSearch: !isValid } })

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        })
    }
}