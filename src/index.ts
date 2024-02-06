import express, { Application, Request, Response, NextFunction } from 'express';



const app: Application = express();
const port: number = parseInt(process.env.PORT || '3030' as string);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})



// app.get('/api/', getUsers)

app.listen(port, () => {
    console.log('listening on port ' + port);
})