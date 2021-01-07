function cartController(){
    return {
        index(req,res){
            res.render('customerse/cart')
        }
    }   
}

module.exports = cartController;