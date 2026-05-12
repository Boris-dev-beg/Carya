/**
 * ! Fichier pour proteger la page administrateur du vendeur lorsqu'il se decconnecte
 */


export { default } from "next-auth/middleware";

export const config = { matcher: ["/Dashboard", "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"] };