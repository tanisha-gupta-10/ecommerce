
import React from 'react';
import home from '../assets/asset 50.svg';
import shorts from '../assets/asset 51.svg';
import subs from '../assets/asset 52.svg';
import you from '../assets/asset 54.svg';
import history from '../assets/asset 55.svg';
import playlist from '../assets/asset 56.svg';
import yvideos from '../assets/asset 57.svg';
import ycourses from '../assets/asset 58.svg';
import watchl from '../assets/asset 59.svg';
import lvideos from '../assets/asset 60.svg';


function Sidebar({ categories, fvrtCount, getCategory }) {

    return (

        <div className='sidebar'>



            <div className='scnd-part'>
                <span className='items selected'>
                    <img src={home} className="" alt="" /> Home </span>
                <span className='items'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRI0ow4pbUnyZGodub0Rl8cMXlmxxzmxm2Ww&s' className="" alt="" /> Categories </span>
                <span className='items'>
                    <img src="https://d2n7zouke881gi.cloudfront.net/randomUploads/webUsage/svgs/group12.svg" className="" alt="" /> Favourite {fvrtCount ? <span className='fvrtCout'>{fvrtCount}</span> : null} </span>
            </div>

            <div className='thrd-part'>
                <span className='items-main' style={{fontSize: '16px' , fontWeight: '600'}}> Categories <img src={you} /> </span>

                {categories.map(category => <span key={category.id} className='items' style={{textTransform : 'capitalize'}} onClick={() => getCategory(category)}> {category} </span>
                )}

            </div>
        </div>

    );
}

export default Sidebar;