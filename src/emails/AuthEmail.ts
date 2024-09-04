
import { transporter } from "../config/nodemailer"

interface IEmail {
    email: string,
    name: string, 
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'Uptask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - CONFIRMAR CUENTA',
            text:'Uptask - CONFIRMAR CUENTA',
            html: `<p>Hola: ${user.name}, has creado tu cuenta en uptask, ya casi está todo listo, solo debes confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar Cuenta</a>
            <p>E ingresa el siguiente código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `
        })
    }

    static SendPasswordResetToken = async ( user : IEmail ) => {
        const info = await transporter.sendMail({
            from: 'Uptask <admin@uptask.com>',
            to: user.email,
            subject: 'Uptask - REESTABLECE TU CUENTA',
            text:'Uptask - REESTABLECE TU CUENTA',
            html: `<p>Hola: ${user.name}, has solicitado reestablecer tu contraseña.</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Cuenta</a>
            <p>E ingresa el siguiente código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
            `
        })
    }

}




