// getCustomer(1, (customer) => {
//     console.log('Customer', customer);
//     if(customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('top Movies', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent');
//             });
//         });
//     }
// });

async function notifyGoldCustomers(){
    try {
        const cust = await getCustomer(1);
        console.log(cust);
        if(cust.isGold){
            const movies = await getTopMovies();
            console.log(movies)
            const mailVerify = await sendEmail(cust.isGold, movies);
        }            
    }
    catch(err) {
        console.log('Error', err.message);
    }
}
notifyGoldCustomers();
// function getCustomer(id, callback) {
function getCustomer(id) {

    return new  Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id:id,
                name:'Oyku',
                isGold:true
            });
        }, 4000);
    });

    // setTimeout(() => {
    //     callback({
    //         id:id,
    //         name:'Oyku',
    //         isGold:true
    //     });
    // }, 4000);
}
// function getTopMovies(callback) {
function getTopMovies() {
    return new  Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["m1",'m2']);
        }, 4000);
    });
    // setTimeout(() =>{
    //     callback(["m1",'m2']);
    // }, 4000);
}
// function sendEmail(email, movies, callback) {
function sendEmail(email, movies) {
    return new  Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Email sent');
        }, 4000);
    });
    // setTimeout(() =>{
    //     callback();
    // }, 4000);
}