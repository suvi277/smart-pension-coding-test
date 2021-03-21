import React, {useState, useCallback, useRef} from 'react'
import PageView from './components/pageView/PageView'
import './App.css'

const Heading = ({title}) => (
<h4 className="title">{title}</h4>
)

const App = () => {
  const [pageViews, setPageViews] = useState([])
  const [disabled, setDisabled] = useState(true)
  let fileReader = useRef()
  let form = useRef(null)
  let file = useRef({})

  const onFileChosen = useCallback(event  => {
    file.current = event.target.files[0]
    setDisabled(!disabled)
  }, [disabled])

  const onSubmit = useCallback(event  => {
    event.preventDefault()

    fileReader.current = new FileReader()
    fileReader.current.onloadend = handleFileRead
    fileReader.current.readAsText(file.current)
    
    form.current.reset()
    setDisabled(!disabled)

  }, [disabled])
  
  const handleFileRead = () => {
    const result = fileReader.current.result
    const pageList = result.split('\n').filter(item => item !== '')
    const pages = {}

    pageList.forEach(page => {
      const name = page.split(' ')[0]
      const currentIp = page.split(' ')[1]
    
      if (pages[name]) {
        const {ips, total} = pages[name]
        if (!ips.includes(currentIp)) {
          ips.push(currentIp)
        }
        pages[name] = {
          ips,
          total: total + 1
        }
        return
      }

      pages[name] = {
        ips: [currentIp],
        total: 1
      }
    })
    setPageViews(pages)
  }

  const sortByProp = (object, prop) => {
    return Object.keys(object).sort((a,b) => object[b][prop] - object[a][prop])
  }


  return (
    <div className="container">
      <h1>Please upload provided webserver.log file and submit to read number of page visits</h1>
      <form data-testid="form" ref={form} className="form" onSubmit={onSubmit}>
          <input data-testid="fileInput" type="file" name="upload file" onChange={onFileChosen}/>
          <button data-testid="submit" disabled={disabled} type="submit">Submit</button>
      </form>
      <div className="result-container">
        { Object.keys(pageViews).length > 0 ?
          <>
          <Heading title="List of total page views"/>
            <ul data-testid="page-views">
              {
              sortByProp(pageViews, 'total').map((item, index) => (
                item &&
                <PageView  key={index} name={item} total={pageViews[item].total} text="visits" />
              ))
              }
            </ul>
            <Heading title="List of total unique page views"/>
            <ul data-testid="unique-page-views">
              {
              sortByProp(pageViews, 'uniquetotal').map((item, index) => (
                item &&
                <PageView key={index} name={item} total={pageViews[item].ips.length} text="unique views" />
              ))
            }
            </ul>
          </>
          : 
          <p>Required data will load here</p>
        }
      </div>
    </div>
  )
}

export default App