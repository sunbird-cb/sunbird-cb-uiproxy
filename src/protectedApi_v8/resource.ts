import { Router } from 'express'
export const userAuthKeyCloakApi = Router()
userAuthKeyCloakApi.get('/', async (req, res) => {
    res.redirect(`https://${req.get('host')}/`) // Prod setup
    // res.redirect('http://localhost:3000/') // Test setup
})
