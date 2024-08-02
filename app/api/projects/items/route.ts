import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, type, projectId } = await request.json();

  try {
    if (type === "file") {
      const newFile = await prisma.file.create({
        data: {
          name,
          content: "",
          projectId,
        },
      });
      return NextResponse.json(newFile, { status: 201 });
    } else if (type === "folder") {
      // For simplicity, we're treating folders as projects
      const newFolder = await prisma.project.create({
        data: {
          name,
          clerkUserId: userId,
        },
      });
      return NextResponse.json(newFolder, { status: 201 });
    } else {
      return NextResponse.json({ error: "Invalid item type" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error creating new item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
