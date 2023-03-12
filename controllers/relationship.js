import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
  
    db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(relationship => relationship.followerUserId));
    }) 
  })
}

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    
    const q = "INSERT INTO `relationships` (`followerUserId`, `followedUserId`) VALUES (?)";

    const values = [
      userInfo.id,
      req.query.userId
    ]
  
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Success following!");
    }) 

  })
}

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    
    const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    console.log('userInfo: ', userInfo.id);
    console.log('userId', req.query.userId)
    const values = [
      userInfo.id,
      Number(req.query.userId)
    ]
  
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Success deleted!");
    }) 

  })
}