import { SearchOutlined } from "@ant-design/icons";
import { Button, Select, Space } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { IProduct } from "entities/product/model";
import { convertDate } from "shared/api/typicode";
import productStore from "entities/product/model/store/Product-store";

export const getColumnSearchProps = (): ColumnType<IProduct> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8, display: 'grid'}} onKeyDown={(e) => e.stopPropagation()}>
        <Select
            showSearch
            style={{ width: 200 }}
            value={selectedKeys}
            placeholder="Search to Select"
            optionFilterProp="children"
            onChange={(e:any) => 
                {
                  setSelectedKeys(e ? [e] : [])
                }
            }
            filterOption={(input, option) => (option?.label ? option?.label+'':'').includes(input)}
            filterSort={(optionA, optionB) =>
            (optionA?.label ? optionA?.label+''  :'').toLowerCase().localeCompare((optionB?.label ? optionB?.label+''  :'').toLowerCase())
            }
            options={productStore.products.map((el,index)=> {return{value:el.name, label:el.name}})}
        />
        <Space>
            <div style={{'marginTop': '5%'}}>
                <Button
                onClick={() => clearFilters&& clearFilters()}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({ closeDropdown: false });
                }}
              >
                Filter
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </div>
        </Space>
      </div>
    ),

    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
    {            
        return  record['name']===value
    },  
  });
  