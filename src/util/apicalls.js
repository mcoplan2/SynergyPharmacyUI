import API from "../util/api"

export async function getAllMedicines(){
    await API.get("/medicines")
}