import api from ".";

export const getQuiz = async () => {
  return await api.get("/quiz");
};

export const getQuizById = async (id: String) => {
    return await api.get(`/quiz/${id}`);
}

export const createQuiz = async (data: any) => {
    return await api.post("/quiz", data);
}

export const updateQuiz = async (id: String, data: any) => {
    return await api.put(`/quiz/${id}`, data);
}

export const deleteQuiz = async (id: String) => {
    return await api.delete(`/quiz/${id}`);
}

export const createQuestion = async (data: any) => {
    return await api.post("/question", data);
}

export const updateQuestion = async (id: String, data: any) => {
    return await api.put(`/question/${id}`, data);
}

export const deleteQuestion = async (id: String) => {
    return await api.delete(`/question/${id}`);
}

export const createAnswer = async (data: any) => {
    return await api.post("/answer", data);
}

export const updateAnswer = async (id: String, data: any) => {
    return await api.put(`/answer/${id}`, data);
}

export const deleteAnswer = async (id: String) => {
    return await api.delete(`/answer/${id}`);
}
