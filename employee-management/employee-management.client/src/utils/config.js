const config = {
    API_BASE_URL: "https://localhost:9090/api", 
  };
  
  export const loadConfig = async () => {
    try {
      const response = await fetch("/config.json");
      const data = await response.json();
      Object.assign(config, data); 
    } catch (error) {
      console.error("Lỗi tải config:", error);
    }
  };
  
  export default config;
  