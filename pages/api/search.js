import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const getMp3FilesInDirectory = async (directoryPath) => {
  const mp3Files = [];
  const files = await fs.readdir(directoryPath);
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const fileStat = await fs.stat(filePath);
    if (fileStat.isDirectory()) {
      const nestedMp3Files = await getMp3FilesInDirectory(filePath);
      mp3Files.push(...nestedMp3Files);
    } else if (path.extname(filePath) === ".mp3") {
      mp3Files.push(filePath);
    }
  }
  return mp3Files;
};

export default async function search(req, res) {
  const folderPath = req.query.folderPath;
  const mp3Files = await getMp3FilesInDirectory(folderPath);
  res.status(200).json(mp3Files);
}
