export const Task = ({id, task, handleDeleteButton}) => {
  return (
    <>
    <div className="flex border-2 justify-between p-2">
    <div id={id}>{task}</div>
    <button className="border-2 p-1" onClick={() => handleDeleteButton(id)}>Delete</button>
    </div>
    </>
  )
}