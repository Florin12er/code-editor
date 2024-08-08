import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newFolder = await prisma.folder.create({
            data: {
                name: data.name,
                projectId: data.projectId,
            },
        });
        return NextResponse.json(newFolder);
    } catch (error) {
        console.error("Error creating folder:", error);
        return NextResponse.json({ error: "Error creating folder" }, { status: 500 });
    }
}
