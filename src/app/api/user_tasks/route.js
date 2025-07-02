import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: 'Missing user_id' }, { status: 400 });
  }

  try {
    // Step 1: Get related task IDs from User_task
    const userTaskLinks = await prisma.user_task.findMany({
      where: {
        assigned_to_id: userId,
      },
      select: {
        related_to_id: true, // task ID
      },
    });

    const taskIds = userTaskLinks.map(link => link.related_to_id);

    // Step 2: Fetch Task objects, their assigned users, and related project
    const tasks = await prisma.task.findMany({
      where: {
        t_id: { in: taskIds },
      },
      include: {
        user_tasks: {
          include: {
            assigned_to: true, // fetch assigned user's full details
          },
        },
        project: true, // include related project
      },
    });

    // Step 3: Add `assigns` field with user names and projectName
    const tasksWithAssigns = tasks.map(task => ({
      ...task,
      assigns: task.user_tasks.map(ut => ut.assigned_to.u_name),
      projectName: task.project?.p_name || null,
    }));

    return NextResponse.json(tasksWithAssigns);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
