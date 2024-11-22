import db from "../Database/index.js"
export default function AssignmentRoutes(app){

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
        res.sendStatus(204);
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        assignmentsDao.deleteAssignment(assignmentId);
        res.sendStatus(204);
    });
    
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const {cid} = req.params;
    const assignments = db.assignments.filter((a) => a.course === cid);
    res.send(assignments);
  })

  app.post("/api/courses/:cid/assignments" , (req,res)=>{
    const {cid} = req.params;
    const assignment = req.body;
    const newAssignment = {
      ...assignment,
      course: cid,
      _id: new Date().getTime().toString()
    }
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  })



}