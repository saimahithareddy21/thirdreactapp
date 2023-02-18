let express=require("express")
let cors=require("cors")
let mongoose=require("mongoose")
let Todo=require("./models/todoschema")
let app=express()
app.use(express.json())
app.use(cors())

// mongodb connection
mongoose.connect("mongodb+srv://Mahitha:Mfs5z5qRYPhXK8S@cluster0.r5rcpos.mongodb.net/devtown-project?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
).then(()=>{console.log("mongodb atlas is connected")})
.catch(()=>console.log("error occured"))
//apis request handler

//get request handler
app.get('/todos',async (req,res)=>{
    const todo =await Todo.find()
    res.send(todo);
})

//post request handler
app.post('/add-todo',async (req,res)=>{
    const data=new Todo({
        text:req.body.text,
    })
    data.save()
    res.send(data)
})

//put request handler

app.put('/update-todo/:id',async (req,res)=>{
   const result= await Todo.findByIdAndUpdate(req.params.id);
   result.complete=!(result.complete)
   result.save()
   res.send(result)
})

//delete request
app.delete('/delete-todo/:id',async (req,res)=>{
       const result=await Todo.findByIdAndDelete(req.params.id)
        res.send({message:"deleted"})
})
//port is included
app.listen(3500,()=>{console.log("port started at port number 3500...")})
