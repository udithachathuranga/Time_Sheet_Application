import { prisma } from '@/lib/prisma'

export async function POST(req) {

    try {
        
        const body = await req.json()
        const { p_name, p_title, p_description, p_status_id, start_date, end_date, created_by_id, assigns } = body

        console.log(p_name);

        const existingProject = await prisma.project.findFirst({ where: { p_name } });

        if (existingProject) {
            return new Response(JSON.stringify({ error: 'Project Name already exists' }), { status: 400 })
        }

        const NewProject = await prisma.Project.create({
            data: {
                p_name,
                p_title,
                p_description,
                p_status_id,
                start_date: new Date(start_date),
                end_date: new Date(end_date),
                created_by_id,
            },
        })

        console.log('New Project Created:', NewProject);
        //get the project id and save in the user_project table
        return new Response(JSON.stringify({ message: 'Project created', project: NewProject }), { status: 201 })
    } catch (err) {
        console.log('Error creating project:', err);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 })
    }
}
