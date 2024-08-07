import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            // Fetch all projects and their files for the user
            const projects = await prisma.project.findMany({
                where: { clerkUserId: userId },
                include: { files: true },
            });

            // Transform the data into a file system structure
            const fileSystem = {
                name: 'Root',
                type: 'folder',
                children: projects.map(project => ({
                    name: project.name,
                    type: 'folder',
                    children: project.files.map(file => ({
                        name: file.name,
                        type: 'file',
                    })),
                })),
            };

            return res.status(200).json(fileSystem);
        } catch (error) {
            console.error('Error fetching file system:', error);
            return res.status(500).json({ error: 'Failed to fetch file system' });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
