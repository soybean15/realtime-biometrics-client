<template>
    <q-table
      flat
      bordered
      title="Treats"
      :rows="reports ? reports.reports : []"
      :columns="columns"
      color="primary"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </template>

      <template v-slot:top-left>

        <MonthPicker @onSelect="onSelect"/>

        

      </template>        
    </q-table>
    
  </template>
  
  <script>
  import { useReportStore } from "@/store/report";
  import { onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { exportFile, useQuasar } from 'quasar'

    import MonthPicker from '../MonthPicker.vue';
  const columns = [
    {
      name: "employee_id",
      required: true,
      label: "id",
      align: "left",
      field: (row) => row.employee_id,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: "name",
      required: true,
      label: "Full Name",
      align: "left",
      field: (row) => row.full_name,
      format: (val) => `${val}`,
      sortable: true,
    },
    {
      name: "attendance",
      required: true,
      label: "Attendance",
      align: "center",
      field: (row) => row.attended,
      format: (val, row) => `${val}/${row.total}`,
      sortable: true,
    },
    {
      name: "lates",
      required: true,
      label: "Lates",
      align: "center",
      field: (row) => row.lates,
      format: (val, row) => `${val??0}/${row.attended}`,
      sortable: true,
    },
  
    {
      name: "absents",
      required: true,
      label: "Absents",
      align: "center",
      field: (row) => row.absents,
      format: (val) => `${val}`,
      sortable: true,
    },
  ];
  
  
  function wrapCsvValue (val, formatFn, row) {
    let formatted = formatFn !== void 0
      ? formatFn(val, row)
      : val
  
    formatted = formatted === void 0 || formatted === null
      ? ''
      : String(formatted)
  
    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')
  
    return `"${formatted}"`
  }
  export default {
    components:{MonthPicker},
    setup() {
      const reportStore = useReportStore();
      const { reports,filter } = storeToRefs(reportStore);
      const $q = useQuasar()
      onMounted(() => {
        reportStore.getReportByMonth();
      });
  
      return {
        columns,
        reports,
        filter,
        onSelect:(val)=>{
            console.log(val)
            reportStore.getReportByMonth(val)
        },
        exportTable() {
  
          const rows = reports.value.reports
  
          // naive encoding to csv format
          const content = [columns.map((col) => wrapCsvValue(col.label))]
            .concat(
              rows.map((row) =>
                columns
                  .map((col) =>
                    wrapCsvValue(
                      typeof col.field === "function"
                        ? col.field(row)
                        : row[col.field === void 0 ? col.name : col.field],
                      col.format,
                      row
                    )
                  )
                  .join(",")
              )
            )
            .join("\r\n");
  
          const status = exportFile("table-export.csv", content, "text/csv");
  
          if (status !== true) {
            $q.notify({
              message: "Browser denied file download...",
              color: "negative",
              icon: "warning",
            });
          }
        },
      };
    },
  };
  </script>
  
  <style>
  </style>