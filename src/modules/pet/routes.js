import express from 'express'
import {
    getPostsAction,
    addPostAction,
    getPostAction,
    updatePostAction,
} from './controllers/PostController'
import {
    getTagsAction,
    addTagAction,
} from './controllers/TagController'
import {
    multerI
} from '../middleware/multer'
import {
    authToken
} from '../middleware/auth'
/* import {
    addPostActionMiddleware,
    getPostActionMiddleware,
    updatePostActionMiddleware,
} from './middleware/requests/postMiddleware'
import {
    addTagActionMiddleware,
    getTagActionMiddleware,
    updateTagActionMiddleware,
} from './middleware/requests/tagMiddleware' */

const router = express.Router()

//POST
router.get('/api/posts', getPostsAction)
router.post('/api/post', [authToken, /* addPostActionMiddleware */], addPostAction)
router.get('/api/post/:id', [/* getPostActionMiddleware */], getPostAction)
router.put('/api/post/:id', [authToken, /* updatePostActionMiddleware */], updatePostAction)

//TAG
router.get('/api/tags', getTagsAction)
router.post('/api/tags/tag', addTagAction)


export default router;