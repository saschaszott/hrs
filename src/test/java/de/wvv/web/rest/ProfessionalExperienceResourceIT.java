package de.wvv.web.rest;

import de.wvv.WirvsvirusApp;
import de.wvv.domain.ProfessionalExperience;
import de.wvv.repository.ProfessionalExperienceRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProfessionalExperienceResource} REST controller.
 */
@SpringBootTest(classes = WirvsvirusApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ProfessionalExperienceResourceIT {

    private static final String DEFAULT_PROFESSIONAL_EXPERIENCE = "AAAAAAAAAA";
    private static final String UPDATED_PROFESSIONAL_EXPERIENCE = "BBBBBBBBBB";

    @Autowired
    private ProfessionalExperienceRepository professionalExperienceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfessionalExperienceMockMvc;

    private ProfessionalExperience professionalExperience;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfessionalExperience createEntity(EntityManager em) {
        ProfessionalExperience professionalExperience = new ProfessionalExperience()
            .professionalExperience(DEFAULT_PROFESSIONAL_EXPERIENCE);
        return professionalExperience;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfessionalExperience createUpdatedEntity(EntityManager em) {
        ProfessionalExperience professionalExperience = new ProfessionalExperience()
            .professionalExperience(UPDATED_PROFESSIONAL_EXPERIENCE);
        return professionalExperience;
    }

    @BeforeEach
    public void initTest() {
        professionalExperience = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfessionalExperience() throws Exception {
        int databaseSizeBeforeCreate = professionalExperienceRepository.findAll().size();

        // Create the ProfessionalExperience
        restProfessionalExperienceMockMvc.perform(post("/api/professional-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(professionalExperience)))
            .andExpect(status().isCreated());

        // Validate the ProfessionalExperience in the database
        List<ProfessionalExperience> professionalExperienceList = professionalExperienceRepository.findAll();
        assertThat(professionalExperienceList).hasSize(databaseSizeBeforeCreate + 1);
        ProfessionalExperience testProfessionalExperience = professionalExperienceList.get(professionalExperienceList.size() - 1);
        assertThat(testProfessionalExperience.getProfessionalExperience()).isEqualTo(DEFAULT_PROFESSIONAL_EXPERIENCE);
    }

    @Test
    @Transactional
    public void createProfessionalExperienceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professionalExperienceRepository.findAll().size();

        // Create the ProfessionalExperience with an existing ID
        professionalExperience.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfessionalExperienceMockMvc.perform(post("/api/professional-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(professionalExperience)))
            .andExpect(status().isBadRequest());

        // Validate the ProfessionalExperience in the database
        List<ProfessionalExperience> professionalExperienceList = professionalExperienceRepository.findAll();
        assertThat(professionalExperienceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfessionalExperiences() throws Exception {
        // Initialize the database
        professionalExperienceRepository.saveAndFlush(professionalExperience);

        // Get all the professionalExperienceList
        restProfessionalExperienceMockMvc.perform(get("/api/professional-experiences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professionalExperience.getId().intValue())))
            .andExpect(jsonPath("$.[*].professionalExperience").value(hasItem(DEFAULT_PROFESSIONAL_EXPERIENCE)));
    }
    
    @Test
    @Transactional
    public void getProfessionalExperience() throws Exception {
        // Initialize the database
        professionalExperienceRepository.saveAndFlush(professionalExperience);

        // Get the professionalExperience
        restProfessionalExperienceMockMvc.perform(get("/api/professional-experiences/{id}", professionalExperience.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(professionalExperience.getId().intValue()))
            .andExpect(jsonPath("$.professionalExperience").value(DEFAULT_PROFESSIONAL_EXPERIENCE));
    }

    @Test
    @Transactional
    public void getNonExistingProfessionalExperience() throws Exception {
        // Get the professionalExperience
        restProfessionalExperienceMockMvc.perform(get("/api/professional-experiences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfessionalExperience() throws Exception {
        // Initialize the database
        professionalExperienceRepository.saveAndFlush(professionalExperience);

        int databaseSizeBeforeUpdate = professionalExperienceRepository.findAll().size();

        // Update the professionalExperience
        ProfessionalExperience updatedProfessionalExperience = professionalExperienceRepository.findById(professionalExperience.getId()).get();
        // Disconnect from session so that the updates on updatedProfessionalExperience are not directly saved in db
        em.detach(updatedProfessionalExperience);
        updatedProfessionalExperience
            .professionalExperience(UPDATED_PROFESSIONAL_EXPERIENCE);

        restProfessionalExperienceMockMvc.perform(put("/api/professional-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfessionalExperience)))
            .andExpect(status().isOk());

        // Validate the ProfessionalExperience in the database
        List<ProfessionalExperience> professionalExperienceList = professionalExperienceRepository.findAll();
        assertThat(professionalExperienceList).hasSize(databaseSizeBeforeUpdate);
        ProfessionalExperience testProfessionalExperience = professionalExperienceList.get(professionalExperienceList.size() - 1);
        assertThat(testProfessionalExperience.getProfessionalExperience()).isEqualTo(UPDATED_PROFESSIONAL_EXPERIENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingProfessionalExperience() throws Exception {
        int databaseSizeBeforeUpdate = professionalExperienceRepository.findAll().size();

        // Create the ProfessionalExperience

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfessionalExperienceMockMvc.perform(put("/api/professional-experiences").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(professionalExperience)))
            .andExpect(status().isBadRequest());

        // Validate the ProfessionalExperience in the database
        List<ProfessionalExperience> professionalExperienceList = professionalExperienceRepository.findAll();
        assertThat(professionalExperienceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfessionalExperience() throws Exception {
        // Initialize the database
        professionalExperienceRepository.saveAndFlush(professionalExperience);

        int databaseSizeBeforeDelete = professionalExperienceRepository.findAll().size();

        // Delete the professionalExperience
        restProfessionalExperienceMockMvc.perform(delete("/api/professional-experiences/{id}", professionalExperience.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfessionalExperience> professionalExperienceList = professionalExperienceRepository.findAll();
        assertThat(professionalExperienceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
