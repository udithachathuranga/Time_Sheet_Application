import { prisma } from '@/lib/prisma'

export async function POST(req) {
    try {
        console.log('testing text');
        const body = await req.json()
        const { t_description, due_date, time_estimate, priority, task_status_id, p_id, added_by_id } = body

        console.log(t_description);
        console.log(p_id);
        const NewTask = await prisma.task.create({
            data: {
                t_description,
                due_date,
                time_estimate,
                priority,
                task_status_id,
                p_id,
                added_by_id,
            },
        })
        
        console.log('New Task Created:', NewTask);
        
        return new Response(JSON.stringify({ message: 'Task created', task: NewTask }), { status: 201 })
    } catch (err) {
        console.log('Error creating task:', err);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 })
    }
}
