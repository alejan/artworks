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
package co.edu.uniandes.csw.artwork.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import co.edu.uniandes.csw.crud.spi.entity.BaseEntity;
import uk.co.jemos.podam.common.PodamExclude;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.ArrayList;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 * @generated
 */
@Entity
@XmlRootElement
public class ClientEntity extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Long id;
    @Size(max = 255)
    @Column(name = "NAME")
    private String name;

    @PodamExclude
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemEntity> wishList = new ArrayList<>();

    @PodamExclude
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaymentEntity> payments = new ArrayList<>();

    /**
     * Obtiene la colección de wishList.
     *
     * @return colección wishList.
     * @generated
     */
    public ClientEntity() {
        //constructor clientEntity
    }

    public ClientEntity(Long id) {
        this.id = id;
    }

    @XmlTransient
    public List<ItemEntity> getWishList() {
        return wishList;
    }

    /**
     * Establece el valor de la colección de wishList.
     *
     * @param wishList nuevo valor de la colección.
     * @generated
     */
    public void setWishList(List<ItemEntity> wishList) {
        this.wishList = wishList;
    }

    /**
     * Obtiene la colección de payments.
     *
     * @return colección payments.
     * @generated
     */
    @XmlTransient
    public List<PaymentEntity> getPayments() {
        return payments;
    }

    /**
     * Establece el valor de la colección de payments.
     *
     * @param payments nuevo valor de la colección.
     * @generated
     */
    public void setPayments(List<PaymentEntity> payments) {
        this.payments = payments;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ClientEntity)) {
            return false;
        }
        ClientEntity other = (ClientEntity) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "co.edu.uniandes.csw.artwork.entities.ClientEntity[ id=" + id + " ]";
    }

}
