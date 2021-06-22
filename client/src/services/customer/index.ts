import ApiService from '@/services/api.service';

const CustomerService = {
  list: async () => {
    try {
      const {data}: any = await ApiService.get('/customer')

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default CustomerService;
