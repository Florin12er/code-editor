import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    try {
        const folders = await prisma.folder.findMany({
            where: { projectId },
        });
        return NextResponse.json(folders);
    } catch (error) {
        console.error("Error fetching folders:", error);
        return NextResponse.json({ error: "Error fetching folders" }, { status: 500 });
    }
}
