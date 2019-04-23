module.exports = async (ctx, next) => {
    const { role } = ctx.state.user;
    const { url } = ctx.request;
  
    const fieldName = url.match(/([^\/]+[^\/])/gm)[0]; 
    const fieldId = url.match(/([^\/]+[^\/])/gm)[1];
  
    const field = ctx.state.user[fieldName];
  
    if (role.type !== 'root' && field && !field.find(item => item._id.toString() === fieldId)) {
      return ctx.unauthorized(
        'You are not allowed to perform this action! (You are not the Owner)'
      );
    }
  
    await next();
  };


  "globla.isOwner"