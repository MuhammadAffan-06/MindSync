import { toast } from "react-toastify";

async function fetchDataJSON(path:string, method:"GET"|"POST", body:any = null) {
    const token = localStorage.getItem("token"); 
    const baseUrl = "http://localhost:5000/";//"http://localhost:5000/"
    const headers:any = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    try {
        const response = await fetch(baseUrl+path, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const responseJson = await response.json();
       
        return responseJson ; 
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; 
    }
}

async function fetchData(path:string, method:"GET"|"POST", body:any = null) {
    const token = localStorage.getItem("token"); 
    const baseUrl = "http://localhost:5000/";//"http://localhost:5000/"
    const headers:any = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["authorization"] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    try {
        const response = await fetch(baseUrl+path, options);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; 
    }
}



export {
    fetchData,
    fetchDataJSON
}