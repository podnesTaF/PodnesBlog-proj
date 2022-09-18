import PostModel from '../models/Post.js'

export const getLastTags = async(req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
        console.log(tags)
        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Cant get articles'
        })
    }
}

export const getAll = async(req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Cant get articles'
        })
    }
}

export const getOne = async(req, res) => {
    try {
        const postId = req.params.id
        
        PostModel.findOneAndUpdate({
            _id: postId
        },
        {
            $inc: {viewsCount: 1}
        },
        {
            returnDocument: 'after'
        },
        (err, doc) => {
            if(err) {
                console.log(err)
                res.status(500).json({
                    message: 'Cant get back articel'
                })
            }

            if(!doc) {
                console.log(doc)
                return res.status(500).json({
                    message: 'Cant get article'
                })
            }
            res.json(doc)
        }
        ).populate('user')
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Cant get articles'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        PostModel.findOneAndDelete({
            _id: postId
        }, (err, doc) => {
            if(err) {
                console.log(err)
                res.status(500).json({
                    message: 'Cant delete articel'
                })
            }

            if(!doc) {
                console.log(doc)
                return res.status(500).json({
                    message: 'Cant get article'
                })
            }

            res.json({
                success: true
            })
        }
        )
    } catch (error) {
        
    }
} 

export const create = async(req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Canot create post'
        })
    }
}

export const update = async(req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(',')
            },
        )

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Cannot update article'
        })
    }
}