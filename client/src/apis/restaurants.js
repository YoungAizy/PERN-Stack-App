import databinder from './databinder';

//PUBLIC ROUTES
export const _public = {
    all: databinder.get('/restaurants/public/all?req_src=client'),
    async singleAll(id){ 
        const result = await databinder.get(`/restaurants/public/${id}?details=all`);
        return result;
    },
    async singlePartial(id){
        const result = await databinder.get(`/restaurants/public/${id}?details=partial`);
        return result;
    }
}

//PROTECTED ROUTES
export const _protected = {
    post: databinder.post('/restaurants/protected/publish'),
    async update(id){
        const result = await databinder.put(`/restaurants/protected/update/${id}`);
        return result;
    },
    async delete(id){
        const result = await databinder.delete(`/restaurants/protected/update/${id}`);
        return result;
    }
}