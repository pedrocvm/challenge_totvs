<template>
  <v-container>
    <v-btn
      :color="showAllCustomers ? 'error' : 'primary'"
      @click="showAllCustomers = !showAllCustomers"
    >
      {{
        showAllCustomers
          ? 'Show only Defaulting Customers'
          : 'Show all Customers'
      }}
    </v-btn>

    <v-card class="tableWrapper">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="customers"
        class="elevation-1"
        :search="search"
      >
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import CustomerService from '@/services/customer';
import { CustomerType } from '@/types/customer.type';

export default Vue.extend({
  name: 'Table',
  data() {
    return {
      showAllCustomers: false,
      allCustomers: [],
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'CPF',
          value: 'cpf',
        },
        {
          text: 'Defaulting?',
          value: 'isDefaulting',
        },
        {
          text: 'Amount',
          value: 'amount',
        },
        {
          text: 'Since',
          value: 'since',
        },
      ],
      search: '',
    };
  },

  async mounted() {
    const allCustomers: CustomerType[] = await CustomerService.list();

    allCustomers.forEach((customer) => {
      customer.since = customer.since
        ? new Intl.DateTimeFormat('pt-br').format(new Date(customer.since!))
        : '---';

      customer.isDefaulting = customer.isDefaulting ? 'Yes' : 'No';

      customer.amount = customer.amount
        ? new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }).format(+customer.amount)
        : '---';

      (this.allCustomers as CustomerType[]) = allCustomers;
    });
  },

  computed: {
    customers: function(): CustomerType[] {
      if (this.showAllCustomers) {
        return this.allCustomers;
      } else {
        const customers: CustomerType[] = [];
        this.allCustomers.forEach((customer: CustomerType) => {
          if (customer.isDefaulting !== 'No') {
            customers.push(customer);
          }
        });
        return customers;
      }
    },
  },
});
</script>

<style lang="scss">
.v-input {
  width: 30rem;
  margin: 0 auto 2rem;
}

.v-btn {
  margin-bottom: 1rem;
}
</style>
