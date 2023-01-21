export class GlobalUtilities {

    static instance: GlobalUtilities;

    private isLoading:boolean = false;
    private Authenticated:boolean=false; // true valor anterior
    private isLoadingDetails:boolean = false;
    
    private constructor() { }


    public static getInstance(): GlobalUtilities {
        if (!GlobalUtilities.instance) {
            GlobalUtilities.instance = new GlobalUtilities();
        }
        return GlobalUtilities.instance;
    }

    public setIsLoading(isLoading:boolean) {        
        this.isLoading = isLoading;
    }
    public getIsLoading(){        
        return this.isLoading;
    }
    public setAuthenticated(Authenticated:boolean){            
            this.Authenticated = Authenticated;
    }
    public IsAuthenticated(){       
        return this.Authenticated;//=false;  // FALSE ME RETORNA EL LOGIN 
        
    }
    public getisLoadingDetails(){
        return this.isLoadingDetails;
    }
    public setisLoadingDetails(isLoadingDetails:boolean){
        this.isLoadingDetails = isLoadingDetails;
    }
    
}