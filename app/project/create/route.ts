import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Create a new project
        const newProject = await prisma.project.create({
            data: {
                name: data.name,
                description: data.description || null,
                clerkUserId: data.clerkUserId, // Ensure this is provided
            },
        });

        // Return the new project's ID
        return NextResponse.json({ projectId: newProject.id });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Error creating project" }, { status: 500 });
    }
}
