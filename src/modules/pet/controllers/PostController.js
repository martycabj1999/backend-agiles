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
        description,
        points,
        views,
        user_id

    } = req.body

    try {
        const post = await addPostService(title, description, points, views, user_id)
        response.data = post
        res.status(201).send(response)
    } catch (error) {
        logError(req, error)
        response.errors.push(error)
        return res.status(500).send(response)
    }
}

export const updatePostAction = async function (req, res) {
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
}