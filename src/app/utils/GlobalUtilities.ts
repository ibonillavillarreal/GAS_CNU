export class GlobalUtilities {

    static instance: GlobalUtilities;

    private isLoading:boolean = false;
    private Authenticated:boolean = true;
    private isLoadingDetails:boolean = false;
    private constructor() {
    }

    public static getInstance(): GlobalUtilities {
        if (!GlobalUtilities.instance) {
            GlobalUtilities.instance = new GlobalUtilities();
        }
        return GlobalUtilities.instance;
    }

    public setIsLoading(isLoading:boolean) {
        //console.log('SE CAMBIO EL VALOR A '+isLoading);
        //this.isLoading = isLoading;
        this.isLoading = isLoading;
    }
    public getIsLoading(){
        //this.isLoading = true;
        return this.isLoading;
    }
    public setAuthenticated(Authenticated:boolean){
            this.Authenticated = true;
    }
    public IsAuthenticated(){
       //return this.Authenticated = true;
        return this.Authenticated;
    }
    public getisLoadingDetails(){
        return this.isLoadingDetails;
    }
    public setisLoadingDetails(isLoadingDetails:boolean){
        this.isLoadingDetails = isLoadingDetails;
    }
}