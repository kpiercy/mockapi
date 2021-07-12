
//get all users
app.get('/api/users', limiter, authenticateToken, (req, res) => {
    dboperations.getUsers().then(result => {
        //console.log(result);
        res.status(200).json(result);
    })
})


app.post('/api/users', acctlimiter, authenticateToken, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }

        dboperations.addUser(user).then(result => {
            res.status(201).json(result);
        })


    } catch {
        res.status(500).send()
    }
})

app.delete('/api/users/delete', authenticateToken, (req, res) => {
    refreshToken = refreshTokens.filter(token => token !== req.body.token)
    res.status(200).send('Logged out')
})