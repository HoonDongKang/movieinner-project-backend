import { DbConnection } from './../../modules/connect'

const writeComment = async (params: any, connection: DbConnection) => {}
const modifyComment = async (params: any, connection: DbConnection) => {}
const deleteComment = async (params: any, connection: DbConnection) => {}

const getIdxComments = async (params: any, connection: DbConnection) => {}

const getUserComments = async (params: any, connection: DbConnection) => {}

export default {
    writeComment,
    modifyComment,
    deleteComment,
    getIdxComments,
    getUserComments,
}
