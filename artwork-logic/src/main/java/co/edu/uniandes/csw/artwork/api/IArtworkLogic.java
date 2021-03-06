/*
The MIT License (MIT)

Copyright (c) 2015 Los Andes University

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
package co.edu.uniandes.csw.artwork.api;

import co.edu.uniandes.csw.artwork.entities.ArtworkEntity;
import co.edu.uniandes.csw.artwork.entities.CategoryEntity;
import co.edu.uniandes.csw.artwork.entities.QualificationEntity;
import java.util.List;

public interface IArtworkLogic {
    public int countArtworks();
    public List<ArtworkEntity> getArtworks(Long artistid);
    public List<ArtworkEntity> getArtworks(Integer page, Integer maxRecords, Long artistid);
    public List<ArtworkEntity> getArtworkByCategory(Integer page, Integer maxRecords, Long categoryid);
    public ArtworkEntity getArtwork(Long artworkid);
    public ArtworkEntity createArtwork(Long artistid, ArtworkEntity entity);
    public ArtworkEntity updateArtwork(Long artistid, ArtworkEntity entity);
    
    public void deleteArtwork(Long id);
    public List<CategoryEntity> listCategory(Long artworkId);
    public CategoryEntity getCategory(Long artworkId, Long categoryId);
    public CategoryEntity addCategory(Long artworkId, Long categoryId);
    public List<CategoryEntity> replaceCategory(Long artworkId, List<CategoryEntity> list);
    public void removeCategory(Long artworkId, Long categoryId);
    public List<ArtworkEntity> getArtworksByUserName(String userName);
    public List<ArtworkEntity> getArtworksByUserName(Integer page, Integer maxRecords, String userName);
    public List<ArtworkEntity> getArtworksFromArtist(String artist);
    public List<QualificationEntity> getQualifications(Long artworkId);
    public List<ArtworkEntity> getLatestArtworks();
}