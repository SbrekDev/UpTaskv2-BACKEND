import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handelInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { hasAuthorization, taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router()

router.use(authenticate)

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es obligatoria'),
    handelInputErrors,
    ProjectController.createProject
)


router.get('/', ProjectController.getAllProjects)


router.get('/:id',
    param('id').isMongoId().withMessage('ID no válido'),
    handelInputErrors,
    ProjectController.getProjectById
)

// routes for tasks
router.param('projectId', projectExists)


router.put('/:projectId',
    param('projectId').isMongoId().withMessage('ID no válido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
    .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es obligatoria'),
    handelInputErrors,
    hasAuthorization,
    ProjectController.updateProject
)

router.delete('/:projectId',
    param('projectId').isMongoId().withMessage('ID no válido'),
    handelInputErrors,
    hasAuthorization,
    ProjectController.deleteProject
)



router.post('/:projectId/tasks',
    hasAuthorization,
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
handelInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProyectTasks
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handelInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es obligatoria'),
    handelInputErrors,
    TaskController.updateTask
)


router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('ID no válido'),
    handelInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('status')
    .notEmpty()
    .withMessage('El estado es obligatorio'),
    handelInputErrors,
    TaskController.updateStatus
)

// routed for teams
router.post('/:projectId/team/find', 
    body('email')
        .isEmail().toLowerCase().withMessage('Email no valido'),
    handelInputErrors,
    TeamMemberController.findMemberByEmail
)
router.get('/:projectId/team', 
    TeamMemberController.getProjectTeam
)

router.post('/:projectId/team', 
    body('id')
        .isMongoId().withMessage('ID no valido'),
    handelInputErrors,
    TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId', 
    param('userId')
        .isMongoId().withMessage('ID no valido'),
    handelInputErrors,
    TeamMemberController.removeMemberById
)

// routes for notes

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
            .notEmpty().withMessage('El contendio de la nota es obligatorio'),
            handelInputErrors,
            NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
            NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('ID no valido'),
    NoteController.deleteNote
)

export default router