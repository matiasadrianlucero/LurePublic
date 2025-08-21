import { queryFindUsers } from '../../queries/profile/queryFindUsers.js';

export async function getFindUser (req, res) {
    const username = req.params.username;
    let results = await queryFindUsers(username);
    res.status(200).json(results);
}