import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  const projectId = searchParams.get('project_id');

  if (!userId || !projectId) {
    return NextResponse.json(
      { error: 'Missing user_id or project_id' },
      { status: 400 }
    );
  }

  try {
    // Step 1: Find task IDs assigned to the user
    const userTaskLinks = await prisma.user_task.findMany({
      where: {
        assigned_to_id: userId,
      },
      select: {
        related_to_id: true,
      },
    });

    const taskIds = userTaskLinks.map(link => link.related_to_id);

    // Step 2: Fetch tasks matching both project and task ID
    const tasks = await prisma.task.findMany({
      where: {
        t_id: { in: taskIds },
        p_id: projectId,
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
