import {
    logRequest,
    logError
} from '../../logger/logger'
import {
    getPostsService,
    addPostService,
    getPostService,
    updatePostService
} from '../services/PostService'

export const getPostsAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const posts = await getPostsService()
        response.data = posts
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const getPostAction = async function (req, res) {

    let response = logRequest(req)

    try {
        const posts = await getPostService(req.params.id)
        response.data = posts
        return res.status(200).json(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}


export const addPostAction = async function (req, res) {

    let response = logRequest(req)
    let {
        title,
        name,
        breed,
        color,
        type,
        size,
        age,
        genre,
        description,
        date,
        phone,
        address,
        latitude,
        longitude,
    } = req.body

    try {
        const post = await addPostService(title,
            name,
            breed,
            color,
            type,
            size,
            age,
            genre,
            description,
            date,
            phone,
            address,
            latitude,
            longitude,
            req.user.id
        )

        const file = req.file

        await uploadS3(file, AWS_S3_BUCKET_REPORT_FOLDER, async (err, data) => {

            //an error occurred while uploading the file
            if (err) return response(res, 500)

            //got on ok, charge the db
            const score = await setScoreExamService(data.Location, exam_id, transcription, correct,
                errors_count, words_count, wpm, wcpm, accuracy_rate)

            if (!score) {
                response.message = "Database error"
                return res.status(400).send(response)
            }

            await setErrorsExamService(score._id, expected, text, visual_initial,
                visual_end, ending, meaning, ommited, self_corrected, function_word, miscue_tag_code)

            response.data = data.Location
            return res.status(200).send(response)

        })

        response.data = post
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

/*export const updatePostAction = async function (req, res) {
    let response = logRequest(req)
    try {
        let {
            id,
            title,
            description,
            points,
            views,
            user_id
        } = req.body

        const postUpdate = await updatePostService(id, title, description, points, views, user_id)
        response.data = postUpdate
        res.status(200).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        res.status(500).send(response)
    }
}*/