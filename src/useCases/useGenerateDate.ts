const useGenerateDate =  ()=>{
    return(
         function formatDate(date: Date | null): string {
            if (!date) return '';
            const d = new Date(date);
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const year = d.getFullYear();
            return `${year}-${month}-${day}`;
        } 
    )

}

export default useGenerateDate





