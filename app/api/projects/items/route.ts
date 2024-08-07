import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        const { name, content, language, file_icon, projectId } = req.body;

        try {
            // Check if the project belongs to the user
            const project = await prisma.project.findFirst({
                where: { id: projectId, clerkUserId: userId },
            });

            if (!project) {
                return res.status(404).json({ error: 'Project not found' });
            }

            const file = await prisma.file.create({
                data: {
                    name,
                    content,
                    language,
                    file_icon,
                    projectId,
                },
            });

            return res.status(201).json(file);
        } catch (error) {
            console.error('Error creating file:', error);
            return res.status(500).json({ error: 'Failed to create file' });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}
