import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const files = await prisma.file.findMany();
        return NextResponse.json(files);
    } catch (error) {
        console.error("Error fetching files:", error);
        return NextResponse.json({ error: "Error fetching files" }, { status: 500 });
    }
}
