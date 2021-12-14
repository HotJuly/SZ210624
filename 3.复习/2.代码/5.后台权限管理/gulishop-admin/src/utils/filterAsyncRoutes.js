function filterAsyncRoutes(asyncRoutes, routeNames){
    // console.log(123,asyncRoutes, routeNames)
    const routes = asyncRoutes.filter( (routeObj) => {
        if(routeObj.children?.length){
            routeObj.children = filterAsyncRoutes(routeObj.children,routeNames)
        }
        return routeNames.includes(routeObj.name);
    })
    return routes;
}
export default filterAsyncRoutes;