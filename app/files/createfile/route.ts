import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newFile = await prisma.file.create({
            data: {
                name: data.name,
                content: data.content,
                language: data.language || "javascript",
                file_icon: data.file_icon,
                projectId: data.projectId,
            },
        });
        return NextResponse.json(newFile);
    } catch (error) {
        console.error("Error creating file:", error);
        return NextResponse.json({ error: "Error creating file" }, { status: 500 });
    }
}
